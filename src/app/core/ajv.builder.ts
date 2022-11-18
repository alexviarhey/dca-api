import Ajv, {Options} from "ajv";

type AjvPlugin = (ajv: Ajv) => Ajv

export class AjvBuilder {

    private options?: Options
    private plugins: Array<AjvPlugin> = []

    public static new(): AjvBuilder {
        return new AjvBuilder()
    }

    public withOptions(options: Options): this {
        this.options = options
        return this
    }

    public bindPlugins(...plugins: AjvPlugin[]): this {
        this.plugins = plugins
        return this
    }

    public build(): Ajv {
        const ajv = new Ajv(this.options)

        this.plugins.forEach(p => {
            p(ajv)
        })

        return ajv
    }
}