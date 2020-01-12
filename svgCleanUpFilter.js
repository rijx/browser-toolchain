function svgCleanUpFilter(element) {
  if (this.path.length == 0 && element.tagname == "svg") {
    const oldProps = element.props || {};
    const newProps = {
      version: oldProps.version || "1.1"
    };

    if (oldProps.viewBox) {
      newProps.viewBox = oldProps.viewBox;
    }

    if (
      newProps.viewBox == null &&
      oldProps.width != null &&
      oldProps.height != null
    ) {
      newProps.viewBox = [
        oldProps.x != null ? oldProps.x.replace(/px$/, "") : 0,
        oldProps.y != null ? oldProps.y.replace(/px$/, "") : 0,
        oldProps.width.replace(/px$/, ""),
        oldProps.height.replace(/px$/, "")
      ].join(" ");
    }

    this.update({
      ...element,
      props: newProps,
      children: element.children.filter(x => x["#name"] != "metadata")
    });
  }
}

module.exports = svgCleanUpFilter;
