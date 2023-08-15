import React, { useEffect } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { BiCaretDown } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession, signIn } from "next-auth/react";
import { addUser } from "@/store/nextSlice";

const Navbar = () => {
	const { data: session } = useSession();
	const { products, favoriteProducts, user } = useSelector(
		(state: RootState) => state.next
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (session) {
			dispatch(
				addUser({
					name: session?.user?.name,
					email: session?.user?.email,
					image: session?.user?.image,
				})
			);
		}
	}, [session, dispatch]);
	return (
		<div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
			<div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
				<Link
					href={"/"}
					className="p-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
				>
					<Image
						className="w-28 object-cover mt-1"
						src={logo}
						alt="logoImg"
						priority={true}
					/>
				</Link>
				<div className="p-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
					<SlLocationPin />
					<div className="text-xs">
						<p>Deliver to</p>
						<p className="text-white font-bold uppercase">USA</p>
					</div>
				</div>
				<div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
					<input
						className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
						type="text"
						placeholder="Search next_amazon_yt products"
					/>
					<span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
						<HiOutlineSearch />
					</span>
				</div>
				{/* */}
				{user ? (
					<div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
						<Image
							width={100}
							height={100}
							src={user.image}
							alt="userImg"
							className="w-8 h-8 rounded-full object-cover"
						/>
						<div className="text-xs text-gray-100 flex flex-col justify-between">
							<p className="text-white font-bold">{user.name}</p>
							<p>{user.email}</p>
						</div>
					</div>
				) : (
					<>
						<div
							onClick={() => signIn()}
							className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
						>
							<p>Hello, sign in</p>
							<p className="text-white font-bold flex items-center">
								Account & Lists
								<span>
									<BiCaretDown />
								</span>
							</p>
						</div>{" "}
					</>
				)}
				<div className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
					<p>Marked</p>
					<p className="text-white font-bold">& Favorite</p>
					{favoriteProducts.length > 0 && (
						<span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
							{favoriteProducts.length}
						</span>
					)}
				</div>
				<Link
					href={"/cart"}
					className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative"
				>
					<Image
						className="w-auto object-cover h-8"
						src={cartIcon}
						alt="cartImage"
						priority={true}
					/>
					<p className="text-xs text-white font-bold mt-3">Cart</p>
					<span className="absolute text-amazon_yellow text-sm top-2 left-[30px] font-semibold">
						{products ? products.length : 0}
					</span>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
