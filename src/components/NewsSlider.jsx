const NewsSlider = () => {
    return ( 
        <div className=" w-full m-auto">
            
        
        <div class="hidden sm:flex flex-col m-auto lg:w-[700px] ">
        <p className="text-xl font-semibold">Nyheter</p>
        <div>

        
        <div class="flex space-x-2 ">

        
        <div class=" w-full md:w-1/2 lg:w-1/4">

            
            <article class="overflow-hidden rounded-lg shadow-lg bg-white">

                <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random"/>
                </a>

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 class="text-lg">
                        <a class="no-underline hover:underline text-black" href="#">
                            Article Title
                        </a>
                    </h1>
                 </header>

                

            </article>

        </div>
        <div class=" w-full md:w-1/2 lg:w-1/4">

            
<article class="overflow-hidden rounded-lg shadow-lg bg-white">

    <a href="#">
        <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random"/>
    </a>

    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 class="text-lg">
            <a class="no-underline hover:underline text-black" href="#">
                Article Title
            </a>
        </h1>
     </header>

    

</article>

</div>
<div class=" w-full md:w-1/2 lg:w-1/4">

            
<article class="overflow-hidden rounded-lg shadow-lg bg-white">

    <a href="#">
        <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random"/>
    </a>

    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 class="text-lg">
            <a class="no-underline hover:underline text-black" href="#">
                Article Title
            </a>
        </h1>
     </header>

    

</article>

</div>
       

<div class=" w-full md:w-1/2 lg:w-1/4">

            
<article class="overflow-hidden rounded-lg shadow-lg bg-white">

    <a href="#">
        <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random"/>
    </a>

    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
        <h1 class="text-lg">
            <a class="no-underline hover:underline text-black" href="#">
                Article Title
            </a>
        </h1>
     </header>

    

</article>

</div>

</div>
</div>

      
        
      

    </div>
</div>
     );
}
 
export default NewsSlider;