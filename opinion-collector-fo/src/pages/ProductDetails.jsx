import {useCategory} from "../hooks/useCategory";
import {useState} from "react";
import {useProductOrigins} from "../hooks/useProductOrigins";
import {useProduct} from "../hooks/useProduct";

function getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log("Error: ", error);
    };
    return reader.result
}

export function ProductDetails() {
    const { addProduct } = useProduct();
    const { categories, categoryLoading } = useCategory();
    const { origins, originLoading } = useProductOrigins();

    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [origin, setOrigin] = useState("");
    const [ean, setEan] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsFilePicked(true);

        let encodedImage = getBase64(selectedFile);

        //const formData = new FormData();
        //formData.append('image', encodedImage);
        let requestJson = {
            categoryId: categoryId,
            title: title,
            image: encodedImage,
            origin: origin,
            ean: ean
        }


        addProduct(requestJson)

        // fetch('/products', {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //     });
    }

    if (categoryLoading) {
        return <p>Loading categories...</p>;
    } else if (originLoading) {
        return <p>Loading origins...</p>;
    }

    return (
        <div className="container">
            <div className="form-container">
                <form className="sign-up-form">
                    <label>Category</label>
                    <input type="text" name="categories" list="categoryList" onChange={(e) => setCategoryId(e.target.accessKey) }/>
                    <datalist id="categoryList">
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryName} />
                        ))}
                    </datalist>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value) }/>
                    <label>Image</label>
                    <input type="file" name="file" onChange={changeHandler} />
                    {isFilePicked ? (
                        <div>
                            <p>Filename: {selectedFile.name}</p>
                            <p>Filetype: {selectedFile.type}</p>
                            <p>Size in bytes: {selectedFile.size}</p>
                            <p>
                                lastModifiedDate:{" "}
                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
                    <label>Origin</label>
                    <input type="text" name="origins" list="originsList" onChange={(e) => setOrigin(e.target.value) }/>
                    <datalist id="originsList">
                        {origins.map((origin) => (
                            <option key={origin} value={origin} />
                        ))}
                    </datalist>
                    <label>EAN</label>
                    <input type="text" onChange={(e) => setEan(e.target.value) }/>
                </form>

                <button onClick={handleSubmit} className="search-btn">
                    Submit
                </button>
            </div>
        </div>
    );
}

// {
//     "categoryId": 0,
//     "title": "string",
//     "image": [
//     "string"
// ],
//     "origin": "USA",
//     "visibility": true,
//     "ean": "string"
// }
