let current_question = 0;

const init = () => {
	buildPage();
};

const buildPage = () => {
  const container = createEle("div"),
        box = createEle("div"),
        q = createEle("p"),
        a1 = createEle("button"),
        a2 = createEle("button"),
        a3 = createEle("button"),
        a4 = createEle("button");

  a1.innerHTML = stuff_one[current_question].A;
  a1.onclick = runAnswer("A");

  a2.innerHTML = stuff_one[current_question].B;
  a2.onclick = runAnswer("B");

  a3.innerHTML = stuff_one[current_question].C;
  a3.onclick = runAnswer("C");

  a4.innerHTML = stuff_one[current_question].D;
  a4.onclick = runAnswer("D");

  box.innerHTML = stuff_one[current_question].question;

  box.append(q,a1,a2,a3,a4);

  container.append(box);

  body.append(container);
};

const runAnswer = x => {
  return () => {
    if(x === stuff_one[current_question].answer) {
      console.log("got it right!");
    } else {
      console.log("wrong!");
    }
  }
};

window.onload = () => {
	init();
};