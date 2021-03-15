var triviaLogTemplate = {
  current_question: 0,
  legend: {},
  id: null,
  pass: 0,
  fail: 0,
  completed: 1
};

const init = () => {
  body.innerHTML = "";
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
        a4 = createEle("button"),
        scoreTracker = createEle("div"),
        passes = createEle("span"),
        fails = createEle("span"),
        completions = createEle("span");

  completions.innerHTML = " | completions: " + tl.completed + " |";

  passes.innerHTML = " | pass: " + tl.pass;

  fails.innerHTML = " | fail: " + tl.fail;

  let stuffs = window["stuff_" + tl.completed];

if(stuffs[tl.current_question]){
  a1.innerHTML = "A: " + stuffs[tl.current_question].A;
  a1.onclick = runAnswer("A",container,stuffs);

  a2.innerHTML = "B: " + stuffs[tl.current_question].B;
  a2.onclick = runAnswer("B",container,stuffs);

  a3.innerHTML = "C: " + stuffs[tl.current_question].C;
  a3.onclick = runAnswer("C",container,stuffs);

  a4.innerHTML = "D: " + stuffs[tl.current_question].D;
  a4.onclick = runAnswer("D",container,stuffs);

  box.innerHTML = (tl.current_question + 1) + ". " + stuffs[tl.current_question].question;

  box.append(q,a1,a2,a3,a4);

  } else {
    const nxtBtn = createEle("button");
    nxtBtn.innerHTML = "NEXT QUIZ!";
    nxtBtn.onclick = () => init();
    box.append("done! ",nxtBtn);
    tl.completed++;
    tl.current_question = 0;
    scoreTracker.innerHTML = "SCORE TRACKER: ";
    scoreTracker.append(passes,fails,completions);
    saveLS("triviaLog",tl);
  }
  container.append(box,scoreTracker);

  body.append(container);
};

const runAnswer = (x,c,stuffs) => {
  return () => {
    var tl = parseLS("triviaLog");
    c.innerHTML = "";
    
    if(x === stuffs[tl.current_question].answer) {
      console.log("got it right!");
      tl.pass++;
    } else {
      console.log("wrong!");
      tl.fail++;
    }
    tl.current_question = tl.current_question + 1;
    tl.legend[tl.current_question] = x;


    saveLS("triviaLog", tl);

    buildPage();
  }
};

window.onload = () => {
	init();
};