export const ProgressBar = ({percentage}) => {
    return (
        <div className={`flex w-[600px] h-5 bg-gray rounded-full`}>
            <div
                style={{width: `${percentage}%`}}
                className={`h-full rounded-l-full bg-blue ${percentage > 98 ? 'rounded-full' : ''}`}
            ></div>
        </div>
    );
}