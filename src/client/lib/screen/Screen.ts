class Screen {
    public static WIDTH : number = 0;
    public static HEIGHT : number = 0;
}

window.addEventListener("resize", (e) => {
    Screen.WIDTH = window.innerWidth;
    Screen.HEIGHT = window.innerHeight;
});

export default Screen;