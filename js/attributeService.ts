class AttrService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data<T = any>(el: HTMLElement, attr: string): T {
    const data =
      el?.dataset[
        attr
          .split("-")
          .reduce(
            (prev, current) =>
              `${prev}${current.charAt(0).toUpperCase()}${current.slice(1)}`
          )
      ];
    el?.removeAttribute(`data-${attr}`);

    try {
      return JSON.parse(data!) as unknown as T;
    } catch (e) {
      return data as unknown as T;
    }
  }

  public attr(el: HTMLElement, attr: string) {
    const data = el.getAttribute(attr);
    el.removeAttribute(attr);
    return data;
  }
}

const service = new AttrService();
export { service as AttrService };
