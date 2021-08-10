import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../models/message.model';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  public messages: IMessage[] = [];
  private i = 0;

  constructor(private message: MessageService) {
    this.message.dispatch.subscribe((message1: any) => {
      console.log(`Se escucho el dispatch`);
      if (message1) {
        message1.item = this.i;
        this.messages.push(message1);
        this.i++;
      }

      if (this.messages.length > 0) {
        this.messages.map(async (message2) => {
          await this.sleep(message2.type === 'error' ? 4500 : 3500).then(() => {
            if (this.messages.length > 0) {
              const index = this.messages.findIndex(
                (m) => m.item === message2.item
              );
              if (index >= 0) {
                this.messages.splice(index, 1);
              }
            }
          });
        });
      }
    });
  }

  ngOnInit(): void {}

  async sleep(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnDestroy(): void {
    this.message.dispatch.unsubscribe();
  }
}
