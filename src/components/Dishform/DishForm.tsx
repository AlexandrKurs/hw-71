import React, {useState} from 'react';
import ButtonLoading from "../UI/ButtonLoading/ButtonLoading.tsx";

interface Props {
    submitForm: (dish: IDish) => void;
    dish?: IDish;
    isEdit?: boolean;
    isLoading?: boolean;
}


const initialState = {
    title: '',
    price: 0,
    image: '',
};

const DishForm: React.FC<Props> = ({submitForm, dish = initialState, isEdit = false, isLoading = false}) => {
    const [form, setForm] = useState(dish);

    const changeForm = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        for (const key in form) {
            if (!form[key as keyof typeof form]) {
                return alert('Заполните все поля');
            }
        }

        submitForm({...form});
    };

    return (
        <form onSubmit={onSubmit} className="w-50 mx-auto row">
            <h3 className="text-center">{isEdit ? 'Edit' : 'Add new'} contact</h3>
            <div className="form-group mb-2">
                <label htmlFor="name">Title:</label>
                <input
                    type="text"
                    onChange={changeForm}
                    value={form.title}
                    id="title"
                    name="title"
                    className="form-control"
                />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="name">Price:</label>
                <input
                    type="number"
                    onChange={changeForm}
                    value={form.price}
                    id="price"
                    name="price"
                    className="form-control"
                />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="urlImage">Url image:</label>
                <input
                    value={form.image}
                    type="url"
                    id="image"
                    name="image"
                    onChange={changeForm}
                    className="form-control"
                />
            </div>

            {form.image !== '' ?
                <div className="w-25 mb-3">
                    <img width="100" src={form.image} alt={form.title}/>
                </div>
                : null
            }

            <div className="mx-auto d-flex justify-content-between">
                <ButtonLoading text={isEdit ? 'Edit' : 'Add'} isLoading={isLoading} isDisabled={isLoading}/>
            </div>
        </form>
    );
};

export default DishForm;