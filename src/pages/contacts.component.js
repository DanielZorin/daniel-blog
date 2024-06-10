import React from 'react'
import './contacts.style.scss'
import useLanguage from '../redux/use-language'

const ContactsPage = () => {
    const { language: lang } = useLanguage();

    return <>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <table>
            <tbody>
                <tr>
                    <td className="social">
                        <a href={lang == "ru" ? "https://juan.livejournal.com/" : "https://juan-sintierra.livejournal.com/"} >
                            <span className="fa">
                                <img src="https://ic.pics.livejournal.com/juan/8338504/692734/692734_900.png"
                                    alt="" width="19" title="lj" />
                            </span> <b> juan</b>
                        </a>
                    </td>
                    <td><div className="commentary">{
                        lang === "ru" ?
                            "Блог в ЖЖ, там те же рассказы, только про каждый город отдельно" :
                            "Livejournal blog with the same stories"
                    }</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://www.instagram.com/danielzorin/"><span className="fa fa-instagram"></span> danielzorin</a></td>
                    <td><div className="commentary">{
                        lang === "ru" ?
                            "Инстаграм, сюда я выкладываю красивые фото" :
                            "Instagram with travel photos"
                    }</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://t.me/danielzorin"><span className="fa fa-telegram"></span> @danielzorin</a></td>
                    <td><div className="commentary">{
                        lang === "ru" ?
                            "Телеграм" :
                            "Telegram"
                    }</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://vk.com/id11332"><span className="fa fa-vk"></span> id11332</a></td>
                    <td><div className="commentary">VK</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://www.facebook.com/daniel.zorin1"><span className="fa fa-facebook"></span> Daniel Zorin</a></td>
                    <td><div className="commentary">Facebook</div></td>
                </tr>
            </tbody>
        </table>
    </>
}

export default ContactsPage;