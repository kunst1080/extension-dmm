const click = (e: HTMLElement | null) => {
    if (e) {
        e.click();
        return true;
    } else {
        return false;
    }
};

const sectionCallback = (section: HTMLElement, label: string) => {
    const ul = section.querySelector<HTMLElement>("ul[data-is-wide]");
    if (ul) {
        const prevButton =
            section.querySelector<HTMLElement>("[data-type=prev]");
        const nextButton =
            section.querySelector<HTMLElement>("[data-type=next]");
        const arr = [];
        do {
            const liHtml = ul.innerHTML;
            arr.push(liHtml);
        } while (!nextButton?.hasAttribute("data-hidden") && click(nextButton));
        ul.innerHTML = arr.join("");
        ul.querySelectorAll<HTMLElement>("span.indicator").forEach((e) =>
            e.remove()
        );
        prevButton?.setAttribute("data-hidden", "true");
    }
};

const appObserver = new MutationObserver((mutationsList, observer) => {
    const arr = new Set<HTMLElement>();
    const filterAdd = (n: Node): void => {
        const e = n as HTMLElement;
        if (e.tagName == "SECTION") {
            arr.add(e);
        }
    };
    mutationsList.forEach((m) => {
        filterAdd(m.target);
        m.addedNodes.forEach(filterAdd);
    });
    arr.forEach((s) => sectionCallback(s, "observer"));
});
appObserver.observe(document.getElementById("root") as Node, {
    attributes: false,
    childList: true,
    subtree: true,
});
window.onload = (e) => {
    document
        .querySelectorAll<HTMLElement>(
            "main > div[direction=column] > section[class]"
        )
        .forEach((s) => sectionCallback(s, "onload"));
};
