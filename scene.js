function setFromChoice(pChoice) {
  let result = [];

  pChoice.forEach((a) => result.push(a.set));

  // for (let i = 0; i < pChoie.length; i++) {
  //   if (pChoice[i].side == true) {
  //     let tempBoo = true;
  //     for (let j = 0; j < resArray[0].length; j++)
  //       if (pChoice.set == resArray[0][j]) tempBoo = false;
  //     if (tempBoo) resArray[0].push(pChoice[i].set);
  //   } else if (pChoice[i].side == false) {
  //     let tempBoo = true;
  //     for (let j = 0; j < resArray[1].length; j++)
  //       if (pChoice.set == resArray[1][j]) tempBoo = false;
  //     if (tempBoo) resArray[1].push(pChoice[i].set);
  //   }
  // }

  return result;
}

function getSetObj(setArray, sampleSetArray) {
  let result = [];

  for (let i = 0; i < setArray.length; i++)
    for (let j = 0; j < sampleSetArray.length; j++)
      if (setArray[i] == sampleSetArray[j].set) result.push(sampleSetArray[j]);

  return result;
}

//get a set as object by a word from word list
function getOneSetObj(wordObject, sampleSetArray) {
  let result;

  for (let j = 0; j < sampleSetArray.length; j++)
    if (wordObject.set == sampleSetArray[j].set) result = sampleSetArray[j];
  return result;
}

function tranformChoiceSet(setArray, sampleSetArray, maxTerm) {
  let result;

  this.score = 0;

  this.setArr = getSetObj(setArray, sampleSetArray);

  //check for contradiction
  let contradictBoo = false;
  let contradictTerm = [];

  for (let i = 0; i < this.setArr.length; i++)
    for (let j = i + 1; j < this.setArr.length; j++)
      for (let k = 0; k < this.setArr[j].antonyms.length; k++)
        if (this.setArr[i].set == this.setArr[j].antonyms[k]) {
          contradictBoo = true;
          if (this.setArr[i].side) contradictTerm = [this.setArr[i].set, this.setArr[j].set];
          else if (!this.setArr[i].side) contradictTerm = [this.setArr[j].set, this.setArr[i].set];
        }
  if (contradictBoo) result = ["contradiction", contradictTerm];
  else {
    //check for positive
    let posBoo = true;
    let posNeg = this.setArr[0].side;
    for (let i = 0; i < this.setArr.length - 1 && posBoo; i++)
      if (this.setArr[i].side != this.setArr[i + 1].side) posBoo = false;

    if (posBoo) {
      let tempTermArr = [];
      for (let i = max(0, this.setArr.length - maxTerm); i < this.setArr.length; i++) {
        let tempTermBoo = true;
        for (let j = 0; j < tempTermArr; j++)
          if (this.setArr[i].set == tempTermArr[j]) tempTermBoo = false;

        if (tempTermBoo) tempTermArr.push(this.setArr[i].set);
      }

      if (posNeg == true) result = ["positive", tempTermArr];
      else if (posNeg == false) result = ["negative", tempTermArr];
    } else {
      //check for need, want or doubt
      let tempNWDTerm = ["", ""];
      let tempLeftBoo = true;
      let tempRightBoo = true;
      for (
        let i = this.setArr.length - 1;
        i > 0 && (tempLeftBoo || tempRightBoo);
        i--
      ) {
        if (this.setArr[i].side == true && tempLeftBoo) {
          tempNWDTerm[0] = this.setArr[i].set;
          tempLeftBoo = false;
        } else if (this.setArr[i].side == false && tempRightBoo) {
          tempNWDTerm[1] = this.setArr[i].set;
          tempRightBoo = false;
        }
      }

      this.setArr.forEach((a) => (this.score += a.score));

      if (this.score > 2) {
        result = ["need", tempNWDTerm];
      } else if (this.score < -2) {
        result = ["want", tempNWDTerm];
      } else if (this.score <= 2 && this.score >= 2) {
        result = ["doubt", tempNWDTerm];
      }
    }
  }

  return result;
}

function scenario(sIndex, termArray) {
  let sceneWordSet = [
    {
      set: "goal",
      term: "purposeful | persistent",
      adj: "meaningful | ",
      adjAN: "undetermined | lost | obsurced",
      sub: "man",
      obj: "goal | target | vision",
      noun: "goal",
      anTerm: "a burden",
      catTerm: "in responsibility",
      contradictTerm: "contradictTerm",
    },
    {
      set: "longTime",
      term: "longlasting | lifelong",
      adj: "continuing",
      adjAN: "lonely | abandoned",
      sub: "man | cat | kid",
      obj: "company | partner",
      noun: "our journey | our eternity",
      anTerm: "short | brief | an instant",
      catTerm: "of time",
      contradictTerm: "contradictTerm",
    },
    {
      set: "entertain",
      term: "entertaining | relaxing",
      adj: "funny | playful",
      adjAN: "spirintless",
      sub: "human",
      obj: "energy | spirint",
      noun: "enjoyment | recreation",
      anTerm: "boring",
      catTerm: "of action",
      contradictTerm: "contradictTerm",
    },
    {
      set: "attach",
      term: "connecting | heart-sharing",
      adj: "lovely | joyful",
      adjAN: "seperated",
      sub: "bee and flower",
      obj: "reunion",
      noun: "attachment | company",
      anTerm: "alienation | seperation",
      catTerm: "of relationship",
      contradictTerm: "contradictTerm",
    },
    {
      set: "impulse",
      term: "passionate | energetic",
      adj: "",
      adjAN: "lifeless | apathetic",
      sub: "being",
      obj: "impulse",
      noun: "passion | energy",
      anTerm: "regret",
      catTerm: "of emotion",
      contradictTerm: "contradictTerm",
    },
    {
      set: "delight",
      term: "delightful | pleasing",
      adj: "",
      adjAN: "sorrowful | mournful",
      sub: "widow",
      obj: "a sincere comfort | comfort | relief",
      noun: "glee | pleasure",
      anTerm: "misery",
      catTerm: "in our feelings",
      contradictTerm: "contradictTerm",
    },
    {
      set: "attention",
      term: "admiring",
      adj: "brave",
      adjAN: "pessimistic",
      sub: "lion",
      obj: "courage",
      noun: "attention",
      anTerm: "indifference",
      catTerm: "of relationship",
      contradictTerm: "contradictTerm",
    },
    {
      set: "noble",
      term: "noble",
      adj: "sincere | profound | virtuous",
      adjAN: "underpriviledge",
      sub: "common",
      obj: "nobleness like a king",
      noun: "a virtue",
      anTerm: "an evil soul",
      catTerm: "of class",
      contradictTerm: "contradictTerm",
    },
    {
      set: "grace",
      term: "graceful | elegant",
      adj: "cimpassionate | kind",
      adjAN: "",
      sub: "criminal | sinner",
      obj: "redemption | salvation",
      noun: "blessing",
      anTerm: "worthless | invaluable",
      catTerm: "of value",
      contradictTerm: "contradictTerm",
    },
    {
      set: "true",
      term: "honest | truthful | frank",
      adj: "sincere",
      adjAN: "person",
      sub: "who is fooled | who always wear a mask",
      obj: "true inspiration | honest solicitude",
      noun: "genuineness",
      anTerm: "an illusion",
      catTerm: "of trust",
      contradictTerm: "contradictTerm",
    },
    {
      set: "freedom",
      term: "free | liberating",
      adj: "open",
      adjAN: "caged",
      sub: "prisoner",
      obj: "blue sky",
      noun: "freedom | relief",
      anTerm: "slavery",
      catTerm: "of rules",
      contradictTerm: "contradictTerm",
    },
    {
      set: "settle",
      term: "settling | harmonious",
      adj: "A",
      adjAN: "homeless",
      sub: "kitty | dog",
      obj: "warm home | bright house",
      noun: "safety | harmony | settlement",
      anTerm: "displaced",
      catTerm: "of distance",
      contradictTerm: "contradictTerm",
    },
    {
      set: "great",
      term: "remarkable | excellent",
      adj: "wondrous",
      adjAN: "mediocre",
      sub: "performer | magician",
      obj: "one great trick",
      noun: "greatness | importance",
      anTerm: "invaluable | worthless",
      catTerm: "of value",
      contradictTerm: "contradictTerm",
    },
    {
      set: "burden",
      term: "onerous | exhausting",
      adj: "exhausting",
      adjAN: "satisfying",
      sub: "checklist",
      obj: "task | duty | never ending checklist",
      noun: "burden | charge | load",
      anTerm: "goal | target",
      catTerm: "in responsibility",
      contradictTerm: "a leaderboard for workload",
    },
    {
      set: "bored",
      term: "boring | dull",
      adj: "lifeless",
      adjAN: "exciting",
      sub: "sub",
      obj: "boredom",
      noun: "boredom | ennui | routine",
      anTerm: "entertainment | excitement",
      catTerm: "of action",
      contradictTerm: "refreshing routine",
    },
    {
      set: "indifferent",
      term: "detached | isolated",
      adj: "detached",
      adjAN: "considerate",
      sub: "distance",
      obj: "departure | separation",
      noun: "indifference | isolation",
      anTerm: "attachment | connection",
      catTerm: "of relation",
      contradictTerm: "an unharmonuous synchronization",
    },
    {
      set: "slavery",
      term: "captive | imprisoned | suppressed",
      adj: "captive",
      adjAN: "free | liberal",
      sub: "slave",
      obj: "slave | low-class worker",
      noun: "slavery | bondage",
      anTerm: "freedom | autonomy",
      catTerm: "of rules",
      contradictTerm: "prison of freedom",
    },
    {
      set: "regret",
      term: "regretful | upset",
      adj: "disappointing",
      adjAN: "encouraging | pleasant",
      sub: "regret",
      obj: "regret | grief",
      noun: "regret",
      anTerm: "bright | pleasing",
      catTerm: "emotional",
      contradictTerm: "sweet misery",
    },
    {
      set: "nonNoble",
      term: "evil | hatred",
      adj: "evil",
      adjAN: "noble",
      sub: "evil",
      obj: "contimination | scam",
      noun: "contimination",
      anTerm: "pure",
      catTerm: "of class",
      contradictTerm: "noble witch",
    },
    {
      set: "worthless",
      term: "pointless | cheap | useless",
      adj: "unoworthy",
      adjAN: "important",
      sub: "worthless",
      obj: "scrap | disposal | waste",
      noun: "waste",
      anTerm: "necessary | essential",
      catTerm: "of value",
      contradictTerm: "priceless disposal",
    },
    {
      set: "pain",
      term: "painful | harmful",
      adj: "painful",
      adjAN: "joyful",
      sub: "pain",
      obj: "suffer | bleed | endure",
      noun: "pain",
      anTerm: "a wonderland | joyful | delightful",
      catTerm: "in our feelings",
      contradictTerm: "joyful sorrow",
    },
    {
      set: "weak",
      term: "fragile | weak | powerless",
      adj: "weak",
      adjAN: "strong",
      sub: "weakness",
      obj: "glass | bubble",
      noun: "flaw | blemish",
      anTerm: "secure | solid | strong",
      catTerm: "of power",
      contradictTerm: "fearful champion",
    },
    {
      set: "fake",
      term: "illusory | dishonest | fabricated",
      adj: "fake",
      adjAN: "real | true",
      sub: "illusion",
      obj: "illusion | lie",
      noun: "lie",
      anTerm: "honest | reliable | genuine",
      catTerm: "of trust",
      contradictTerm: "honest thief",
    },
    {
      set: "overwhelm",
      term: "unstoppable | destructive | devastating",
      adj: "devastating",
      adjAN: "constructive",
      sub: "wild",
      obj: "untied (beast | horse) | boar",
      noun: "wild | (unstoppable | ) destruction",
      anTerm: "constructive | reliable",
      catTerm: "of force",
      contradictTerm: "when a unstoppable force meet an unmovable object",
    },
    {
      set: "shortTime",
      term: "short | brief | quick",
      adj: "short",
      adjAN: "long",
      sub: "a moment",
      obj: "moment | twinkle | blink",
      noun: "moment",
      anTerm: "long-lasting | durable",
      catTerm: "of time",
      contradictTerm: "an endless minute",
    },
  ];

  let tempRitaSet = {
    set: "set",
    term: "term",
    adj: "adj",
    adjAN: "adjAN",
    sub: "sub",
    obj: "obj",
    noun: "noun",
    anTerm: "anTerm",
    catTerm: "catTerm",
    contradictTerm: "contradictTerm",
  };
  let tempRitaSet_ = {
    set: "set",
    term: "term",
    adj: "adj",
    adjAN: "adjAN",
    sub: "sub",
    obj: "obj",
    noun: "noun",
    anTerm: "anTerm",
    catTerm: "catTerm",
    contradictTerm: "contradictTerm",
  };

  sceneWordSet.forEach((a) => {
    if (a.set == termArray[0]) tempRitaSet = a;
    else if (a.set == termArray[1]) tempRitaSet_ = a;
  });  


  let sceneRule = {
    start: "$need",
    need:
      "($n_0_1 ($n_1_1 | $n_1_2 | $n_1_3) | ($n_1_1 | $n_1_2 | $n_1_3) $n_0_2 | ($n_1_1 | $n_1_2 | $n_1_3)) ($n_2_1 | $n_2_2)",
    n_0_1: "You are essential to me",
    n_1_1:
      "Like $adjAN.art() $sub desperating for $obj , I am desperating for your $posTerm love.",
    n_1_2: "I need your $posTerm love, like $adj $sub need $obj.",
    n_1_3: "$posTerm.cap() is fundemental to life.  Like $obj to $adjAN $sub.",
    n_0_2: "I (can barely | can't) live without you.",
    n_2_1: "But it is also like a $adj $obj_ , LK_ $posTerm _LK but LK_ $negTerm _LK .",
    n_2_2:
      "Is that (the truth | real)?  Is my feeling a $adj_an reflection?  Or just a LK_ $posTerm _LK LK_ $negTerm _LK .",

    want:
      "($w_0_1 ($w_1_1 | $w_1_2) | $w_1_3) ($w_2_1 | $w_2_2) ($w_3_1 | $w_3_2 | $w_3_3)",
    w_0_1: "You are (the one | all) that I have (dreamed | wished) for.",
    w_1_1: "$adj.cap() $obj.  You are my $posTerm love.",
    w_1_2:
      "My lust is like growing fire,  I want every second of the $posTerm you.",
    w_1_3:
      "I wish for a $posTerm love, more than all the (wealth | treasure | happiness) in the world.  $obj is $posTerm , and so is you",
    w_2_1:
      "That is just a piece of my dream.  The other piece is full of $obj_.",
    w_2_2: "Is my want $negTerm_an ?  Or just something $negTerm.",
    w_3_1:
      "If all those moment of LK_ $posTerm_noun _LK (will eventually | is actually) LK_ $negTerm _LK .  What's the point?",
    w_3_2: "Love is LK_ $posTerm _LK (while being | and) LK_ $negTerm _LK , inevitably so",
    w_3_3: "Is love really LK_ $posTerm _LK as I have wished or LK_ $negTerm _LK ?",

    doubt: "$d_0_1 ($d_1_1 | $d_1_2) ($d_2_1 | $d_2_2) $d_3_1",
    d_0_1: "We are in a $place.",
    d_1_1:
      "I hold your hand and confess my love.  (Everyday I wish to be with you. | I have spent many night dreaming about you.)  You are my $adj $obj",
    d_1_2:
      'We sit together like a couple, but we are not.  "Why not be one?"  I say.  "I love you.  Your $posTerm_noun is irreplaceable."',
    d_2_0: "You tell me you also have feelings on me.",
    d_2_1:
      "But it could just be our subjective craving.  All those $posTerm moments could suddenly become $negTerm.",
    d_2_2:
      "But you look at my eyes and say that you are afraid.  That what's $posTerm is actually $negTerm.",
    d_3_1:
      "Yes, everything might just be LK_ biased _LK .  But could love even be LK_ rational _LK ?",

    positive:
      "$termS  In this incomplete world, we awfully desire for something this perfect.  Thus, we created 'love'.  L-O-V-E.  The perfect four letters to bury up the hole of reality.  Is love actually that perfect perfect LK_ magic _LK ?  Or simple a created LK_ fantasy _LK ?",
    negative:
      "$termS  All I have is negative thoughts.  The ugly face of love cover by the illusory beauty.  Why do we love?  Why do I love?  A single sparkles begins this endless chain reaction.  Is it possible to escape the course of the world.  Is it our LK_ fate _LK?  Or is love our only path to truthful LK_ delight _LK ?",

    contradiction:
      "Love is $posTerm.  Love is also $negTerm.  It's like a $contradictTerm .  A LK_ contradiction _LK $catTerm .",

    posTerm: tempRitaSet.term,
    adj: tempRitaSet.adj,
    adjAN: tempRitaSet.adjAN,
    sub: tempRitaSet.sub,
    obj: tempRitaSet.obj,
    posTerm_noun: tempRitaSet.noun,

    negTerm: tempRitaSet_.term,
    adj_an: tempRitaSet_.adj,
    obj_: tempRitaSet_.obj,
    negTerm_an: tempRitaSet_.anTerm,
    contradictTerm: tempRitaSet_.contradictTerm,
    catTerm: tempRitaSet_.catTerm,
    
    termS: 'something',
  };
  
  
  let sceneRita = RiTa.grammar(sceneRule);
  
  if (sIndex == "positive" || sIndex == "negative") {
    let tempTermS = "";
    termArray.forEach((a) => {
      tempTermS += `(${a}).cap() . `;
      
    });
    sceneRita.addRule("termS", tempTermS);
  }

  sceneRita.addRule("start", `$${sIndex}`);
  
  

  let result = sceneRita.expand();
  return result;
}

// function changeScene(sIndex, pChoice) {
//   let lPool = [];
//   let rPool = [];
//   let resLine = "";

//   for (let i = 0; i < pChoice.length; i++) {
//     if (pChoice[i].set >= 1 && pChoice[i].set <= 10) {
//       lPool.push(pChoice[i]);
//     } else if (pChoice[i].set >= 11 && pChoice[i].set <= 20) {
//       rPool.push(pChoice[i]);
//     }
//   }
//   if (lPool.length >= 3 && rPool.length >= 3) {
//     if (sIndex == 1) {
//       resLine = `I need ${lPool[lPool.length - 2].subject}, ${lPool[lPool.length - 1].subject}.  Like a man in snow desperate for wood and fire. Hey Ms. Love, are you ${lPool[lPool.length - 2].subject} and ${lPool[lPool.length - 1].subject}? Or you are just a ${rPool[rPool.length - 2].subject}, entering my life as a ${rPool[rPool.length - 1].subject}. It is like a castle in the sky, wondrous but illusory.`;
//     }
//   }

//   return resLine;
// }
