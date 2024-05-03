import { createCanvasCtx } from "./Util";



export class TextureAtlas<Textures extends {
    [key: string]: [ number, number, number, number ];
}> {
    public readonly textures: Textures;

    public readonly img: HTMLImageElement | HTMLCanvasElement;

    public constructor(src: string, textures: Textures);
    public constructor(img: HTMLImageElement | HTMLCanvasElement, textures: Textures);
    public constructor(srcOrImg: string | HTMLImageElement | HTMLCanvasElement, textures: Textures) {
        if(typeof srcOrImg == 'string') {
            this.img = document.createElement('img');
            this.img.loading = 'eager';
            this.img.src = srcOrImg;
        } else {
            this.img = srcOrImg;
        }
        this.textures = textures;
    }

    public awaitLoad(): Promise<void> {
        return new Promise((resolve, reject) => {
            if(this.img instanceof HTMLCanvasElement) {
                return resolve();
            }
            if(this.img.complete && this.img.naturalWidth !== 0) {
                return resolve();
            }

            const onLoad = () => {
                this.img.removeEventListener('load', onLoad);
                this.img.removeEventListener('error', onError);
                resolve();
            }
            const onError = () => {
                this.img.removeEventListener('load', onLoad);
                this.img.removeEventListener('error', onError);
                reject();
            }

            this.img.addEventListener('load', onLoad);
            this.img.addEventListener('error', onError);
        });
    }

    public onLoad(callbackfn: (atlas: TextureAtlas<Textures>) => void): void {
        this.awaitLoad().then(() => callbackfn(this));
    }

    public draw(ctx: CanvasRenderingContext2D, texture: keyof Textures, x: number, y: number, width: number, height: number): void {
        const [ sx, sy, sw, sh ] = this.textures[texture];
        ctx.drawImage(this.img, sx, sy, sw, sh, x, y, width, height);
    }



    public toImageDataAtlas(): TextureAtlasImageData<{
        [key in keyof Textures]: ImageData;
    }> {
        const [ canvas, ctx ] = createCanvasCtx(this.img.width, this.img.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.img, 0, 0);

        return new TextureAtlasImageData(
            Object.fromEntries(Object.entries(this.textures).map(([ name, [ x, y, width, height ] ]) => {
                return [ name, ctx.getImageData(x, y, width, height) ];
            })) as {
                [key in keyof Textures]: ImageData;
            }
        );
    }

}



export class TextureAtlasImageData<Textures extends {
    [key: string]: ImageData;
}> {
    public readonly textures: Textures;

    public constructor(textures: Textures) {
        this.textures = textures;
    }

    public toImageAtlas(pad: boolean = true): TextureAtlas<{
        [key in keyof Textures]: [ number, number, number, number ];
    }> {
        // TODO: Actual packing.
        let atlasWidth: number = 0;
        let atlasHeight: number = 0;
        let rects: {[key in keyof Textures]?: { x: number, y: number, width: number, height: number, name: keyof Textures }} = {};

        let x: number = 0;
        for(const name in this.textures) {
            const img = this.textures[name];

            if(pad) x++;

            rects[name] = {
                x,
                y: (pad ? 1 : 0),
                width: img.width,
                height: img.height,
                name
            };

            x += img.width + (pad ? 1 : 0);
            atlasWidth = x;
            atlasHeight = Math.max(atlasHeight, img.height + (pad ? 2 : 0));
        }

        // To image
        const [ canvas, ctx ] = createCanvasCtx(atlasWidth, atlasHeight);
        for(const name in rects) {
            const rect = rects[name]!;
            ctx.putImageData(this.textures[name], rect.x, rect.y);
        }
        return new TextureAtlas(canvas, Object.fromEntries(Object.entries(rects).map(([ name, rect ]) => {
            rect = rect!;
            return [ name, [ rect.x, rect.y, rect.width, rect.height ] ];
        })) as {
            [key in keyof Textures]: [ number, number, number, number ];
        });
    }

}

