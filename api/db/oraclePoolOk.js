/* Copyright (c) 2018, 2019, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   connectionpool.js
 *
 * DESCRIPTION
 *   Shows connection pool usage.  Connection pools are recommended
 *   for applications that use a lot of connections for short periods.
 *
 *   Other connection pool examples are in sessionfixup.js and webappawait.js.
 *   For a standalone connection example, see connect.js
 *
 *   In some networks forced pool termination may hang unless you have
 *   'disable_oob=on' in sqlnet.ora, see
 *   https://oracle.github.io/node-oracledb/doc/api.html#tnsadmin
 *
 *   This example uses Node 8's async/await syntax.
 *
 *****************************************************************************/

const objoracle = require('oracledb')
const stringConnection = `(DESCRIPTION =
								(LOAD_BALANCE = ON)
								(FAILOVER = ON)
								(ADDRESS =
									(PROTOCOL = TCP)
									(HOST = 172.18.41.15)
									(PORT = 1521)
								)
								(ADDRESS = 
									(PROTOCOL = TCP)
									(HOST = 172.18.41.15)
									(PORT=1521)
								)
								(CONNECT_DATA=
									(SERVICE_NAME=SISPASEO)
									(FAILOVER_MODE=
										(TYPE=SELECT)
										(METHOD = BASIC)
									)
								)
							)`

const cns = {
	user: process.env.HR_USER || 'apppanama',
	password: process.env.HR_PASSWORD || 'P4n4m42020',
	connectString: stringConnection,
}

async function open(sql) {
	const pool = objoracle.createPool({
		user: process.env.HR_USER || 'apppanama',
		password: process.env.HR_PASSWORD || 'P4n4m42020',
		connectString: stringConnection,
		// edition: 'ORA$BASE', // used for Edition Based Redefintion
		// events: false, // whether to handle Oracle Database FAN and RLB events or support CQN
		// externalAuth: false, // whether connections should be established using External Authentication
		// homogeneous: true, // all connections in the pool have the same credentials
		// poolAlias: 'default', // set an alias to allow access to the pool via a name.
		// poolIncrement: 1, // only grow the pool by one connection at a time
		// poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
		// poolMin: 0, // start with no connections; let the pool shrink completely
		// poolPingInterval: 60, // check aliveness of connection if idle in the pool for 60 seconds
		// poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
		// queueMax: 500, // don't allow more than 500 unsatisfied getConnection() calls in the pool queue
		// queueTimeout: 60000, // terminate getConnection() calls queued for longer than 60000 milliseconds
		// sessionCallback: myFunction, // function invoked for brand new connections or by a connection tag mismatch
		// stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
	})
	console.log('Connection pool started')

	let connection
	try {
		// Get a connection from the default pool
		connection = await objoracle.getConnection(cns)
		const options = { outFormat: objoracle.OUT_FORMAT_OBJECT }
		const result = await connection.execute(sql, {}, options)
		return result
	} catch (err) {
		return err
	} finally {
		if (connection) {
			try {
				// Put the connection back in the pool
				await connection.close()
			} catch (err) {
				console.error(err)
			}
		}
	}
}

function close(cn) {
	cn.release(function (err) {
		if (err) {
			console.error(console.error(err.message))
		}
	})
}

exports.open = open
exports.close = close
