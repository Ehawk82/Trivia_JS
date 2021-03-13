var triviaLogTemplate = {
  current_question: 0,
  legend: {},
  id: null,
  pass: 0,
  fail: 0,
  completed: 0
};

const init = () => {
  var tl = parseLS("triviaLog");
  if (!tl || tl === null) {
    LSinit("triviaLog",triviaLogTemplate);
  }
  buildPage();
};

const buildPage = () => {
  var tl = parseLS("triviaLog");

  const container = createEle("div"),
        box = createEle("div"),
        q = createEle("p"),
        a1 = createEle("button"),
        a2 = createEle("button"),
        a3 = createEle("button"),
        a4 = createEle("button");

  a1.innerHTML = "A: " + stuff_one[tl.current_question].A;
  a1.onclick = runAnswer("A",container);

  a2.innerHTML = "B: " + stuff_one[tl.current_question].B;
  a2.onclick = runAnswer("B",container);

  a3.innerHTML = "C: " + stuff_one[tl.current_question].C;
  a3.onclick = runAnswer("C",container);

  a4.innerHTML = "D: " + stuff_one[tl.current_question].D;
  a4.onclick = runAnswer("D",container);

  box.innerHTML = (tl.current_question + 1) + ". " + stuff_one[tl.current_question].question;

  box.append(q,a1,a2,a3,a4);

  container.append(box);

  body.append(container);
};

const runAnswer = (x,c) => {
  return () => {
    var tl = parseLS("triviaLog");
    c.innerHTML = "";
    
    if(x === stuff_one[tl.current_question].answer) {
      console.log("got it right!");
      tl.pass++;
    } else {
      console.log("wrong!");
      tl.fail++;
    }
    tl.current_question = tl.current_question + 1;
    tl.legend[tl.current_question] = x;
    tl.completed++;


    saveLS("triviaLog", tl);

    buildPage();
  }
};

window.onload = () => {
	init();
};