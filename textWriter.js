//Interval break sign "IB[0-9]+ " Line break sign "L2B"
class textWriter {
  constructor(str, x, y, txtMaxWid, LineSpacing, breakSign, txtSize) {
    this.str = str;
    this.x = x;
    this.y = y;
    this.w = txtMaxWid;
    this.h = LineSpacing;
    this.clickBoz = [];
    this.Breaker = [];
    this.Breaker[0] = [];
    this.IBregex = /IB[0-9]+/;
    this.LKstart = "LK_";
    this.LKend = "_LK";
    this.LKregex = /^_LK_.*_LK_$/;
    this.LBSign = "L2B";
    this.wSpace = "&spsp;";
    this.notes = [".", ",", ":", ";", "?", "!", `"`, `'`];
    this.txtSize = txtSize;
    
    
    //for Time display
    this.timeBoo = false;
    this.timeCount = 0;
    this.timer = 0;
    this.interval = 0;
    this.linkIndex = [];

    let Splitter = split(str, breakSign);
    let numOfLine = 1;
    let spacing = 0;

    //calculate numbers of lines
    let linkWdStart = false;
    let linkWdEnd = false;
    let linkWdCount = 0;
    let tempLink = "";
    
    textSize(this.txtSize);
    for (let i = 0; i < Splitter.length; i++) {
      if (Splitter[i].includes(this.wSpace)) {
        Splitter[i] = Splitter[i].replaceAll(this.wSpace, " ");
      }
      if (Splitter[i].includes(this.LKstart)) {
        linkWdStart = true;
        tempLink = "";
        append(this.Breaker[numOfLine - 1], Splitter[i]);
      } else if (Splitter[i].includes(this.LKend)) {
        linkWdEnd = true;
        linkWdStart = false;
        append(this.Breaker[numOfLine - 1], Splitter[i]);
      } else if (this.IBregex.test(Splitter[i])) {
        append(this.Breaker[numOfLine - 1], Splitter[i]);
      } else if (Splitter[i].includes(this.LBSign)) {
        spacing = 0;
        this.Breaker[numOfLine] = [];
        numOfLine++;
      } else {
        let tempStr = Splitter[i];
        let TempBoo = true;
        for (let no = 0; no < this.notes.length; no++)
          if (tempStr == this.notes[no]) TempBoo = false;
        if (TempBoo && spacing != 0) spacing += textWidth(" ");
        if (spacing + textWidth(tempStr) > this.w && TempBoo) {
          spacing = 0;
          this.Breaker[numOfLine] = [];
          numOfLine++;
        }

        //check for red clickable words
        if (linkWdStart) {
          if (tempLink != "") tempLink += " ";
          tempLink += tempStr;
          linkWdCount++;
          this.linkIndex.push([
            numOfLine - 1,
            this.Breaker[numOfLine - 1].length,
          ]);
          let tempBox = new clickBox(
            this.x + spacing,
            this.y + (numOfLine - 1) * this.h,
            textWidth(tempStr),
            textAscent() + textDescent(),
            tempStr
          );
          this.clickBoz.push(tempBox);
        } else if (linkWdEnd) {
          for (let li = 0; li < linkWdCount; li++)
            this.clickBoz[this.clickBoz.length - 1].setLink(tempLink);

          tempLink = "";

          linkWdCount = 0;
          linkWdEnd = false;
        }

        if (this.LKregex.test(Splitter[i])) {
          let tempBox = new clickBox(
            this.x + spacing,
            this.y + (numOfLine - 1) * this.h,
            textWidth(tempStr),
            textAscent() + textDescent(),
            tempStr
          );
          append(this.clickBoz, tempBox);
        }

        spacing += textWidth(tempStr);
        append(this.Breaker[numOfLine - 1], Splitter[i]);
      }
    }
  }
  clickBoxCheck() {
    let result = false;
    for (let i = 0; i < this.clickBoz.length; i++)
      if (this.clickBoz[i].clickCheck()) result = true;
    return result;
  }
  clickBoxIndex() {
    let result = -1;
    for (let i = 0; i < this.clickBoz.length; i++)
      if (this.clickBoz[i].clickCheck()) result = i;
    return result;
  }

  setStyle(
    txtSize,
    defaultC,
    AlterC,
    HoverC,
    defaultF,
    AlterF,
    HoverF,
    HoverStyle
  ) {
    this.txtSize = txtSize;
    this.defaultC = defaultC;
    this.AlterC = AlterC;
    this.HoverC = HoverC;
    this.defaultF = defaultF;
    this.AlterF = AlterF;
    this.HoverF = HoverF;
    this.HoverStyle = HoverStyle;
  }

  setFrame(x, y, w, h, txtSize) {
    this.clickBoz.forEach((a) => {
      a.x = map(a.x, this.x, this.txtSize + this.x, x, x + txtSize);
      a.y = map(a.y, this.y, this.h + this.y, y, y + h);
      a.w = map(a.w, 0, this.w, 0, w);
      a.h = textAscent() + textDescent();
    });

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  startTime(intervol) {
    this.interval = intervol;
    this.timer = millis();
    this.timeCount = 0;
    this.timeBoo = true;
  }

  display() {
    textAlign(LEFT, TOP);
    textSize(this.txtSize);
    let moveCount = 0;
    if (millis() - this.timer > this.interval && this.timeBoo) {
      this.timeCount++;
      this.timer = millis();
    }
    for (let i = 0; i < this.Breaker.length; i++) {
      let spacing = 0;
      for (let j = 0; j < this.Breaker[i].length; j++) {
        if (this.IBregex.test(this.Breaker[i][j])) {
          let tempNum = int(this.Breaker[i][j].match(/[0-9]+/));
          moveCount += tempNum[0];
        } else if (
          this.Breaker[i][j].includes(this.LKstart) ||
          this.Breaker[i][j].includes(this.LKend)
        ) {
        } else {
          moveCount++;
          if (moveCount < this.timeCount || !this.timeBoo) {
            let TempBoo = true;
            for (let no = 0; no < this.notes.length; no++)
              if (this.Breaker[i][j] == this.notes[no]) TempBoo = false;
            if (TempBoo && spacing != 0) spacing += textWidth(" ");

            let tempStr = this.Breaker[i][j];

            fill(this.defaultC);
            textFont(this.defaultF);
            textStyle(NORMAL);

            for (let k = 0; k < this.clickBoz.length; k++) {
              if (i == this.linkIndex[k][0] && j == this.linkIndex[k][1]) {
                if (this.clickBoz[k].clickCheck()) {
                  fill(this.HoverC);
                  textFont(this.HoverF);
                  textStyle(this.HoverStyle);
                  instructionIndex = 1;
                } else {
                  fill(this.AlterC);
                  textFont(this.AlterF);
                  textStyle(NORMAL);
                }
              }
            }

            text(tempStr, this.x + spacing, this.y + i * this.h);
            textFont(this.defaultF);
            textStyle(NORMAL);
            spacing += textWidth(tempStr);
          }
        }
      }
    }
    // if (moveCount < this.timeCount+10) this.timeBoo = false;
  }
}
