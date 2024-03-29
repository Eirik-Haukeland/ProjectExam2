import { useEffect, useState } from "react";
import noImage from "../../assets/No_Image_Available.jpg"
import cssImgCarusel from "./imgCarusel.module.css"
import Image from "../Image"

export default function ImgCarusel({images, classNames, carusel}) {

    const [imageNumber, setImageNumber] = useState(0)

    let currentImg = noImage
    let currentAlt = "no image is available for this location"

    // remove one so that it can be compared with array index
    const numberOfImages = images.length - 1

    if (Array.isArray(images) && images[0]) {
        currentImg = images[imageNumber]
        currentAlt = ''
    }

    useEffect(() => {
        currentImg = images[imageNumber]
    }, [imageNumber])

    function nextImg() {
        setImageNumber(imageNumber >= numberOfImages ? 0: imageNumber + 1)
    }

    function prevImg() {
        setImageNumber(imageNumber <= 0 ? numberOfImages : imageNumber - 1)
    }

    return (numberOfImages > 0) 
    ?   (<div className={`${classNames} ${cssImgCarusel.caruselConteiner}`}>
            {images.map((img, index) => (
                <div role="img" 
                    aria-label={`${index + 1} of ${images.length} images`} 
                    style={{backgroundImage: `url(${img})`}} 
                    hidden={index !== imageNumber} 
                    className={cssImgCarusel.caruselImg} 
                    key={`${img}--${index}`}>
                </div>))}
            <button onClick={prevImg}>Prev</button>
            <button onClick={nextImg}>Next</button>
        </div>)
    :   ( <Image src={currentImg}
            alt={currentAlt}
            className={`${classNames} ${cssImgCarusel.caruselImg}`} 
        />)
}