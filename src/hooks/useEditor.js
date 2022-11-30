import React from "react";

export const useEditor = () => {
    const [html, setHtml] = React.useState("");
    const editorRef = React.useRef(null);

    const updateInput = (_e) => {
      setHtml(() => parseHTML(editorRef.current.innerHTML));
    };
  
    const parseHTML = (rawHtmlString) => {
      let parsedString = "";
      var regExpFirstPart = /<span\b[^>]*>/g;
      var regExpSecondPart = /<\/span>/g;
      parsedString = rawHtmlString.replace(regExpFirstPart, "{{ ");
      parsedString = parsedString.replace(regExpSecondPart, " }}");
      parsedString = parsedString.replace(/&nbsp;/g,' ');
      return parsedString;
    };
  
  
    const showInfo = () => {
      console.log(html)
    }
  
    const checkLastCharIsWhiteSpace = (range) => {
      const ws = document.createTextNode("\u00A0");
      const whitespaceNodeValue = ws.nodeValue;
      const rangeNodeValue = range?.commonAncestorContainer?.nodeValue;
      if (!rangeNodeValue) {
        return true;
      }
      const stringLastIndex = rangeNodeValue.length - 1;
      return rangeNodeValue?.[stringLastIndex] === whitespaceNodeValue;
    };
  
    const clickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (document.activeElement.id !== "editor") {
        editorRef.current.focus();
      }
      const sel = window.getSelection();
      let range = sel.getRangeAt(0);
  
      const lastCharWhiteSpace = checkLastCharIsWhiteSpace(range);
      const tag = document.createElement("span");
      tag.setAttribute("contenteditable", false);
      tag.onclick = () => tag.remove();
      tag.innerText = e.target.innerText;  
      tag.classList.add("tag");
      range.collapse(true);
      const whitespace = document.createTextNode("\u00A0");
      const spaceWrappers = {
        start: whitespace,
        end: whitespace.cloneNode(true)
      };
  
      range.insertNode(spaceWrappers.end); // end space
      range.insertNode(tag); // tag
      !lastCharWhiteSpace && range.insertNode(spaceWrappers.start); // 2 space
  
      sel.removeAllRanges();
      range = document.createRange();
  
      range.setStart(spaceWrappers.end, 1);
      range.setEnd(spaceWrappers.end, 1);
      range.collapse(true);
      sel.addRange(range);
  
      setHtml(() => parseHTML(editorRef.current.innerHTML));
    };
    
    const length = editorRef.current?.innerText.length

    return {
        updateInput,
        showInfo,
        clickHandler,
        length,
        editorRef
    }
}


