import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# 판교의 메타몽 👩🏻‍💻 (Ditto in Pangyo)
- 판교에서 백엔드 개발자로 근무중 (Working in Pangyo as a backend developer)
- 블로그와 깃헙을 연동중 (Linked my blog to my gitHub repository)
- 주로 TIL, 개발 서적, 알고리즘 풀이를 업로드 (Usually uploading TIL, developer books and algorithm problem solvings)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fditto-astrd%2Fhit-counter&count_bg=%235BBAA3&title_bg=%23E1E1E1&icon=badoo.svg&icon_color=%23D75E5E&title=%E2%9D%97%EF%B8%8F&edge_flat=false)](https://hits.seeyoufarm.com)

## Programming

<p>
  <img alt="" src= "https://img.shields.io/badge/Java-0398fc?style=flat-square&logo=Java&logoColor=white"/> 
  <img alt="" src= "https://img.shields.io/badge/Spring-9ae66e?style=flat-square&logo=Spring&logoColor=white"/>
  <img alt="" src= "https://img.shields.io/badge/MySQL-dbdbdb?style=flat-square&logo=MYSQL&logoColor=orange"/>
</p>

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  }});

(async () => {

  // 피드 목록
  const feed = await parser.parseURL('https://astrid-dm.tistory.com/rss'); // 본인의 블로그 주소

  text += `<ul>`;

  // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 10; i++) {
    const {title, link} = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
  }

  text += `</ul>`;

  // README.md 파일 생성
  writeFileSync('README.md', text, 'utf8', (e) => {
    console.log(e);
  })
  console.log('업데이트 완료');
})();
