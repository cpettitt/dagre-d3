var util = require("../util");

module.exports = addHtmlLabel;

function addHtmlLabel(root, node) {
  var fo = root.select("foreignObject");
  if(!fo[0][0]) {
    fo = root.append("foreignObject")
             .attr("width", "100000");
  }
  var div = fo.select("div");
  if(!div[0][0]) {
    div = fo
        .append("xhtml:div");
    div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  }
  var label = node.label;
  switch(typeof label) {
    case "function":
      div.insert(label);
      break;
    case "object":
      // Currently we assume this is a DOM object.
      div.insert(function() { return label; });
      break;
    default: div.html(label);
  }

  util.applyStyle(div, node.labelStyle);
  div.style("display", "inline-block");
  // Fix for firefox
  div.style("white-space", "nowrap");

  var w, h;
  div
      .each(function() {
        w = this.clientWidth;
        h = this.clientHeight;
      });

  fo
      .attr("width", w)
      .attr("height", h);

  return fo;
}
