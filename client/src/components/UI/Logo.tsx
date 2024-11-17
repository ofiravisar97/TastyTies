import {cva,type VariantProps} from "class-variance-authority";
import {twMerge} from "tailwind-merge";


const logo = cva(['font-semibold'],{
    variants: {
        size: {
            medium: 'text-md',
            large: 'text-lg',
            xl: 'text-xl',
            xxl: 'text-2xl',
            xxxxl: 'text-4xl',
            x6l: 'text-6xl'
        }
    },
    defaultVariants: {
        size: "medium"
    }
});

type Props = {
    className?: string,
} & VariantProps<typeof logo>;

const Logo = ({className,size} : Props) => {
    return (
        <h1 className={twMerge(className,logo({size}))}><span className='text-primary'>Tasty</span>Ties</h1>
    )
}

export default Logo;