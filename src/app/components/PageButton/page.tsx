interface PageProps {
    selectedPage: number
    current: number
    onClickFunction: () => void
}

const PageButton = ({current, selectedPage, onClickFunction}: PageProps) => {
    const pathData:string[] = [
        "M10 10l2 -2v8",
        "M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3",
        "M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1",
        "M10 8v3a1 1 0 0 0 1 1h3",
        "M10 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3v-4h4"
    ]

    const strokeColor:string = selectedPage === current ? "#d51007" : "#ffffff"
    const btnStyle:string = "m-auto w-1/3 h-1/3 cursor-pointer hover:stroke-main-red"
    
    return current === 3 ?
        <svg onClick = {onClickFunction} xmlns="http://www.w3.org/2000/svg" className={btnStyle} viewBox="0 0 24 24" strokeWidth="1.75" stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d={pathData[current]}/>
            <path d="M14 8v8" />
        </svg>
        :
        <svg onClick = {onClickFunction} xmlns="http://www.w3.org/2000/svg" className={btnStyle} viewBox="0 0 24 24" strokeWidth="1.75" stroke={strokeColor} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d={pathData[current]}/>
        </svg>
}

export default PageButton