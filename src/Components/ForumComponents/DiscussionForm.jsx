import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';
import useCategories from '../../CustomHooks/useCategories';
import Loading from '../Loading';

const DiscussionForm = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [slug, setSlug] = useState("");
    const { categories, isPending, refetch } = useCategories();

    const axiosPublic = useAxiosPublic()

    const category = watch("category")
    const titleWatch = watch("title");

    useEffect(() => {
        if (titleWatch) {
            setSlug(titleWatch.toLowerCase().replace(/\s+/g, "-"));
        }
    }, [titleWatch]);

    const onSubmit = async (data) => {
        const selectedCategory = category === "new-category" ? data.newCategory : data.category;

        const newDiscussion = {
            title: data.title,
            slug,
            content: data.content,
            category: selectedCategory,
            author: {
                name: user.displayName,
                profilePic: user.photoURL,
                email: user.email
            },
            views: 0,
        };
        try {
            const res = await axiosPublic.post("/discussions", newDiscussion);
            if (res.data) {
                document.getElementById('my_modal_3').close()
                toast.success("Discussion uploaded successfully");
                reset();
                refetch();
            }
        } catch (error) {
            document.getElementById('my_modal_3').close()
            console.error("Error uploading discussion:", error);
            toast.error("Failed to upload discussion. Please try again.");
        }


    }
    if (isPending) {
        return <Loading />
    }
    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='p-5'>
                        <h2 className="text-2xl font-semibold mb-6 text-center">Post a Discussion</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Title Input */}
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Discussion Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Enter the title of your discussion"
                                    {...register('title', { required: 'Title is required' })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-[#ffc107] focus:border-[#ffc107]"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>

                            {/* Category Dropdown */}
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    id="category"
                                    {...register('category', { required: 'Category is required' })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-[#ffc107] focus:border-[#ffc107]"
                                >
                                    {
                                        categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))
                                    }
                                    <option value="new-category">Add New Category</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                            </div>

                            {/* New Category Name */}
                            {
                                category === "new-category" &&
                                <div className="mb-4">
                                    <label htmlFor='newCategory' className="block text-sm font-medium text-gray-700">
                                        New Category Name
                                    </label>
                                    <input
                                        id='newCategory'
                                        {...register('newCategory', {
                                            required: category === 'new-category' ? 'New category name is required' : false
                                        })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-[#ffc107] focus:border-[#ffc107]"
                                        placeholder="Enter new category name"
                                        hidden={category !== "new-category"}
                                    />
                                    {errors.newCategory && (
                                        <span className="text-red-500">
                                            {errors.newCategory.message}
                                        </span>
                                    )}
                                </div>
                            }

                            {/* Content Textarea */}
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    id="content"
                                    placeholder="Enter the content of your discussion"
                                    {...register('content', { required: 'Content is required' })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-[#ffc107] focus:border-[#ffc107]"
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                            </div>
                            {/* Buttons */}
                            <div className="">
                                <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DiscussionForm;