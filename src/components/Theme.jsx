import React, { useEffect, useMemo, useState } from 'react'

const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
]
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light')
export const Theme = () => {
    const [theme, setTheme] = useState('light')
    useEffect(() => {
        setTheme(localStorage.getItem('theme') || 'light')
    }, [])
    const themeItems = useMemo(() => themes.map((t) => (
        <li key={t} >
            <a
                className={t === theme ? " bg-transparent text-base-content active p-1" : " bg-transparent text-base-content p-1"}
                onClick={() => {
                    setTheme(t)
                    document.documentElement.setAttribute('data-theme', t)
                    localStorage.setItem('theme', t)
                }}
            >
                <div data-theme={t} className='h-0 w-0 border-8 border-s-primary border-t-secondary shadow-2xl border-b-accent border-l-base-100 rounded-box'></div>{t}
            </a>
        </li>
    )), [theme])

    return (
        <div className="dropdown dropdown-top fixed bottom-[6px] left-2">
            <div tabIndex={0} role="button" className="btn btn-active h-auto min-h-0 p-2 border-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                </svg>

            </div>

            <ul onClick={() => document.activeElement.blur()} tabIndex={0} className="dropdown-content menu menu-sm overflow-auto block bg-base-200 rounded-box z-[1] p-2 shadow h-[50vh]">
                {themeItems}
            </ul>
        </div>
    )
}

