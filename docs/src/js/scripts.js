var triviaLogTemplate = {
  current_question: 0,
  legend: {
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
    6:"",
    7:"",
    8:"",
    9:"",
    10:"",
    11:"",
    12:"",
    13:"",
    14:"",
    15:"",
    16:"",
    17:"",
    18:"",
    19:"",
    20:"",
    21:"",
    22:"",
    23:"",
    24:"",
    25:"",
    26:"",
    27:""},
  id: null,
  pswd: "",
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
  if (tl.id === null) {

//ask to sign up
const signUpBox = createEle("div"),
      signInName = createEle("p"),
      signInNameInput = createEle("input"),
      signInPass = createEle("p"),
      signInPassInput = createEle("input"),
      signUpBtn =  createEle("button"),
      rememberMeLabel = createEle("label"),
      showPassLabel = createEle("label"),
      rememberMeBtn = createEle("input"),
      showPassBtn = createEle("input");


signInPassInput.type = "password";

rememberMeLabel.innerHTML = "REMEMBER ME";

showPassLabel.innerHTML = "SHOW PASS";

showPassBtn.type = "checkbox";

rememberMeBtn.type = "checkbox";

signUpBtn.innerHTML = "SIGN UP!";
signUpBtn.disabled = true;

signInName.innerHTML = "CREATE LOGIN: ";
signInName.append(signInNameInput);

signInPass.innerHTML = "CREATE PASSWORD: ";
signInPass.append(signInPassInput);

signUpBox.append(signInName,signInPass,showPassLabel,showPassBtn,rememberMeLabel,rememberMeBtn,signUpBtn);

body.append(signUpBox);
  } else {

//login
  }
  //buildPage();
};
const hiddenPasswordToggle = (x) => {
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
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
        completions = createEle("span"),
        average = createEle("span");

  var avg = ((tl.pass / (tl.pass + tl.fail)) * 100).toFixed(2),result;

  if(isNaN(avg)) {
     result = "0%";
  } else {
     result = avg + "%";
  }

  average.innerHTML = " average: " + result;

  completions.innerHTML = " completions: " + tl.completed;

  passes.innerHTML = " pass: " + tl.pass;

  fails.innerHTML = " fail: " + tl.fail;

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

  box.innerHTML = stuffs[tl.current_question].question;

  box.append(q,a1,a2,a3,a4);

  } else {
    const nxtBtn = createEle("button");
    nxtBtn.innerHTML = "NEXT QUIZ!";
    nxtBtn.onclick = () => init();
    box.append("done! ",nxtBtn);
    tl.completed++;
    tl.current_question = 0;
      
    saveLS("triviaLog",tl);
  }

  scoreTracker.append(passes,fails,completions,average);

  container.append(box,scoreTracker);

  body.append(container);
};

const runAnswer = (x,c,stuffs) => {
  return () => {
    var tl = parseLS("triviaLog");
    c.innerHTML = "";
    
    if(x === stuffs[tl.current_question].answer) {

      tl.pass++;
    } else {

      tl.fail++;
    }
    tl.current_question = tl.current_question + 1;

    tl.legend[tl.completed] += x;

    saveLS("triviaLog", tl);

    buildPage();
  }
};

window.onload = () => {
	init();
};