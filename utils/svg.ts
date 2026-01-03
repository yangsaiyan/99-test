const tokenSvgs = import.meta.glob(
    "../src/assets/tokens/*.svg",
    { eager: true }
);

function getTokenSVG(s: string): string {
    const module = tokenSvgs[`../src/assets/tokens/${s}.svg`] as any;
    return module?.default || module || '';
}

export { getTokenSVG }