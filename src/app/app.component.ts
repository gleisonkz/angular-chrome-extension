import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-chrome-extension';
  color: string;

  public updateColor(color: string) {
    chrome.storage.sync.set({ color });
  }

  ngOnInit(): void {
    chrome.storage.sync.get('color', ({ color }) => {
      this.color = color;
    });
  }

  public colorize() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const id = tabs[0].id;
      if (id == null) return;
      chrome.tabs.executeScript(id, {
        code: 'document.body.style.backgroundColor = "' + this.color + '";',
      });
    });
  }
}
