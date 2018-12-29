export function returnFillColor(score) {
  if(score > 1) {
    score = (score / 100).toFixed(2);
  }

  let color;
    if(score >= .75) {
      color = 'rgba(0,255,0,.55)';
    };
    if(score >= .45 && score < .75) {
      color = 'rgba(255,120,0,.55)';
    }
    if(score >= 0 && score < .45) {
      color = 'rgba(255,0,0,.55)';
    }
  return color;
}

export function returnBorderColor(score) {
  if(score > 1) {
    score = (score / 100).toFixed(2);
  }

  let color;
    if(score >= .75) {
      color = 'rgba(0,255,0,.75)';
    };
    if(score >= .45 && score < .75) {
      color = 'rgba(255,120,0,.85)';
    }
    if(score >= 0 && score < .45) {
      color = 'rgba(255,0,0,.75)';
    }
  return color;
}

export function mapRange (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
