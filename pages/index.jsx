import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import parseHtml, { domToReact } from "html-react-parser";
import axios from "axios";
import cheerio from "cheerio";
import htmlParser from "htmlparser2";

const replacer = html => {
  const $ = cheerio.load(html);
  const codes = $("code");
  const arr = [];
  let counter = 0;

  codes.each(function(el, idx) {
    arr.push($(this).html());
    // $(this).html("");
  });

  const elems = parseHtml($("body").html(), {
    replace(node) {
      if (node.name === "code") {
        return (
          <code>
            {htmlParser.DomUtils.getOuterHTML(node.children, { xmlMode: true })}
          </code>
        );
      }
    }
  });

  return elems;
  // return html.replace(/(<code>)(.+)(<\/code>)/gs, (m, p1, p2, p3) => {
  //   const inner = p2.replace(/<(.+)>/g, (m, i1) => m);

  //   return `${p1}${inner}${p3}`;
  // });
};

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://192.81.217.200/api/v1/posts?perPage=10").then(res => {
      setPosts(res.data.data.items);
    });
  }, []);

  // const data = html.replace(/<(\/?script(\/?))>/g, (m, p1) => {
  //   return `&lt;${p1}&gt;`;
  // });

  return (
    <div className="container">
      {posts.map((el, idx) => {
        return (
          <div
            className="post"
            key={idx}
            style={{ border: "1px solid black", width: "1500px" }}
          >
            <h2>{el.title}</h2>
            <div>{replacer(el.text)}</div>
            <div className="answers">
              {el.answers.map((answer, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid green",
                      width: "70%",
                      margin: "10px 20px"
                    }}
                  >
                    {replacer(answer.text)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>

    // <div>
    //   <h1>Hello world from Next.js</h1>
    //   <div dangerouslySetInnerHTML={{ __html: data }}></div>
    // </div>
  );
};

Index.getInitialProps = async function({ reduxStore }) {
  // Здесь запускаются асинхронные методы для запроса с сервера
  // await reduxStore.dispatch(fetchPosts())
  return {};
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // Экшены для вызова в компоненте
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
