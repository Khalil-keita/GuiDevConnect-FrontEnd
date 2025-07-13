import { Component } from '@angular/core';

@Component({
  selector: 'app-topic-detail',
  imports: [],
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.css'
})
export class TopicDetail {
  codeExample = `function fetchWithTimeout(url, options, timeout = 8000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}`;

  codeExample1 = `function fetchWithTimeout(url, options, timeout = 8000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}`;
}
