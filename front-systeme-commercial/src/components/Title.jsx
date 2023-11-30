/* eslint-disable react/prop-types */
function Title(props) {
    const { text, className } = props;

    return (
        <h1 className={className}>
            {text}
        </h1>
    )
}

export default Title;