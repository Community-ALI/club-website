
function MyComponent({ title = 'default', text = 'default' }) {
    return (
        <div>
            <h1 className="text-darkBlue text-[55px] xlg:text-[50px] 
      lg:text-[40px] md:text-[35px] sm:text-[30px] xsm:text-[34px] md:mt-[50px]
        text-center mt-[40px] xsm:mt-[40px] xxsm:text-[30px]"
      >{title}</h1>
            <p>{text}</p>
            {/* Additional JSX and components */}
        </div>
    );
}

export default MyComponent;