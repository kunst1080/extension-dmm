const click = (e: HTMLElement | null) => {
    if (e) {
        e.click();
        return true;
    } else {
        return false;
    }
}
window.onload = () => {
    const columns = document.querySelectorAll<HTMLElement>("main > div[direction=column] > section[class]");
    columns.forEach((c) => {
        const ul = c.querySelector<HTMLElement>("ul[data-is-wide]");
        if (ul) {
            const arr = [];
            do {
                const liHtml = ul.innerHTML;
                arr.push(liHtml);
            } while (click(c.querySelector<HTMLElement>("[data-type=next]:not([data-hidden])")));
            ul.innerHTML = arr.join('');
            ul.querySelectorAll<HTMLElement>("span.indicator").forEach((e) => e.remove());
        }
    });
}
