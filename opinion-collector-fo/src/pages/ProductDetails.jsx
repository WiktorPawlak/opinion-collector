import { useState } from "react";
import { useEffect } from "react";
import { apiGetCategories } from "../api/categoryApi";
import {useClient} from "../hooks/useUser";
import {useCategory} from "../hooks/useCategory";


export function ProductDetails() {
    const { categories, loading } = useCategory();

    if (loading) {
        return <p>Loading categories...</p>;
    }

    return (
        <div className="container">
            <div className="form-container">
                <form className="sign-up-form">
                    <label>Category</label>
                    <input type="text" name="categories" list="categoryList"/>
                    <datalist id="categoryList">
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryName} />
                        ))}
                    </datalist>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} />
                    <label>Image</label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                    <label>Origin</label>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} />
                    <label>EAN</label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                </form>
                {/*<button className="signInButton" onClick={signInButtonHandle}>*/}
                {/*    Sign In*/}
                {/*</button>*/}
            </div>

            {/*<a href="/sign-up">*/}
            {/*    <button className="joinUsButton">*/}
            {/*        New here? <span>Join us.</span>*/}
            {/*    </button>*/}
            {/*</a>*/}
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
