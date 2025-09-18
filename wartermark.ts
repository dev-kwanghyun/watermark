// 워터마크 클래스
class WaterMark {
  private parentTag: HTMLElement;
  private text: string;
  private timeId: NodeJS.Timeout | null = null;
  private waterMarkTag: HTMLElement | null;
  private waterMarClassName = "pointer-events-none absolute z-[13] text-[15px]";
  constructor({ text, parentTag }: { text: string; parentTag: HTMLElement }) {
    this.parentTag = parentTag;
    this.text = text;
    this.waterMarkTag = this.createWaterMarkTag();
  }

  createWaterMarkTag() {
    const watermarkDiv = document.createElement("div");
    watermarkDiv.id = "watermark";

    watermarkDiv.textContent = this.text;

    return watermarkDiv;
  }

  updatePosition() {
    if (!this.waterMarkTag) return;
    const maxTop = this.parentTag.offsetHeight - this.waterMarkTag.offsetHeight;
    const maxLeft = this.parentTag.offsetWidth - this.waterMarkTag.offsetWidth;

    // 워터마크의 스타일을 변경하거나 그럴경우가 있기때문에...
    if (this.waterMarkTag.className !== this.waterMarClassName) {
      this.waterMarkTag.className = this.waterMarClassName;
    }
    if (this.waterMarkTag.style.color !== "rgba(135, 135, 135, 0.5)") {
      this.waterMarkTag.style.color = "rgba(135, 135, 135, 0.5)";
    }

    this.waterMarkTag.style.top = `${maxTop * Math.random()}px`;
    this.waterMarkTag.style.left = `${maxLeft * Math.random()}px`;
  }

  start() {
    this.timeId = setInterval(() => {
      const isWaterMark = this.parentTag.querySelector("#watermark");
      if (isWaterMark) {
        this.updatePosition();
      } else {
        if (!this.waterMarkTag) return;
        this.parentTag.append(this.waterMarkTag);
        this.updatePosition();
      }
    }, 5000);
  }

  clear() {
    if (this.timeId) {
      clearInterval(this.timeId);
      this.timeId = null;
    }
    if (this.waterMarkTag?.parentNode) {
      this.waterMarkTag.parentNode.removeChild(this.waterMarkTag);
    }
    this.waterMarkTag = null;
  }
}

export default WaterMark;
