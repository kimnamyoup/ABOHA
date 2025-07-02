import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../css/shop.css"
import Sbutton from '../component/Sbutton'

const Shop = () => {

    const navi = [
        {
            key: "n1", thumb: require("../images/comunity.png"), opts: [
                { value: "n1", label: "커뮤니티", path: "/cmt" }
            ]
        },
        {
            key: "n2", thumb: require("../images/cart.png"), opts: [
                { value: "n2", label: "포인트샵", path: "/shop" }
            ]
        },
        {
            key: "n3", thumb: require("../images/home.png"), opts: [
                { value: "n3", label: "HOME", path: "/Mainpage" }
            ]
        },
        {
            key: "n4", thumb: require("../images/info.png"), opts: [
                { value: "n4", label: "마이페이지", path: "/Mypage" }
            ]
        },
        {
            key: "n5", thumb: require("../images/setting.png"), opts: [
                { value: "n5", label: "환경설정", path: "/Set" }
            ]
        },
    ]

    const [Navi, setNavi] = useState(
        navi.reduce((acc, item) => ({ ...acc, [item.key]: [] }), {})
    )


    const category = [
        {
            key: "ct1",
            text: 'Q1.평소 사람들과의 소통방식은 어떠하신가요?',
            opts: [
                { value: 'gift', label: '기프티콘' },
                { value: 'Franchise', label: '프랜차이즈' },
                { value: 'Toys', label: '도서 및 완구' },
                { value: 'culture', label: '문화 및 예술' },
                { value: 'etc', label: "기타" },
            ]
        }
    ]

    const Foryou = [
        {
             key: "f1", thumb: require("../images/rec1.png"), opts: [
                { value: "f1", label: "상품1 \n 2000p", path: "/Set" }
            ]
        },
        {
             key: "f1", thumb: require("../images/rec2.png"), opts: [
                { value: "f1", label: "상품2"+"\n"+"2000p", path: "/Set"}
            ]
        },
        {
             key: "f1", thumb: require("../images/rec3.png"), opts: [
                { value: "f1", label: "상품3 2000p", path: "/Set"}
            ]
        },
        {
             key: "f1", thumb: require("../images/setting.png"), opts: [
                { value: "f1", label: "환경설정"+"\n"+"2000p", path: "/Set"}
            ]
        },

    ]

    const [select, setSelect] = useState(
        Foryou.reduce((acc, f) => ({ ...acc, [f.key]: [] }), {})
    )

    const [answers, setAnswer] = useState(
        category.reduce((acc, c) => ({ ...acc, [c.key]: [] }), {})
    )

    const toggleSelect = (qkey, val) => {
        setAnswer(prev => {
            const arr = prev[qkey];
            const has = arr.includes(val);
            return {
                ...prev,
                [qkey]: has
                    ? arr.filter(x => x !== val)
                    : [val]
            };

        })
    }

    return (
        <div className='SH'>
            <h2 className='sh_main'>포인트샵</h2>
            <div className='category'>
                <h3 className='cate'>카테고리</h3>
                {category.map((c) => (
                    <div key={c.key} className="question-block">
                        <div className="btns">
                            {c.opts.map((opt) => (
                                <Sbutton
                                    key={opt.value}
                                    active={answers[c.key].includes(opt.value)}
                                    onClick={() => {
                                        toggleSelect(c.key, opt.value);
                                        console.log(c.key, opt.value);
                                    }}
                                >
                                    
                                    {opt.label}
                                    {opt.price}
                                </Sbutton>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className='recommand'>
                <h3 className='ct_tit'>당신을 위한 추천</h3>
                <div className='r_main'>
                    {Foryou.map(f => (
                        <div key={f.key} className="pro_block">
                            <div className="pbtns">
                                <img className="pthumb" src={f.thumb} alt="t1" />
                                {f.opts.map(opt => (
                                    <Link
                                        className="pthumb_comu"
                                        key={opt.value}
                                        active={select[f.key].includes(opt.value)}
                                        onClick={() => {

                                        }}
                                    >
                                        {opt.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='popular'>

            </div>
            <div className="navi_bar">
                {navi.map(n => (
                    <div key={n.key} className="navi_item">

                        {n.opts.map(opt => (
                            <Link
                                to={opt.path}
                                className="thumb_comu"
                                key={opt.value}
                                active={Navi[n.key].includes(opt.value)}
                                onClick={() => {
                                }}
                            >
                                <img className="thumb2" src={n.thumb} alt="navigation" />
                                {opt.label}
                            </Link>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Shop