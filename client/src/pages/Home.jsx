import React, {useState, useEffect} from 'react'
import { Card, Loader, FormField } from "../components";

const RenderCards = ( {data, title} ) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post}/>)
  }
  return (
    <h2 className="mt-5 text-[#4b5563] text-xl suppercase">{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://genairtify.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPost.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="sm:p-8 px-4 py-8 max-w-7xl">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#27272a] text-[18px] max-w-[700px]">
        Explore an extensive assortment of awe-inspiring and artistically striking images curated by DALL-E AI and other esteemed contributors within the GenAIrtify community.
        </p>
      </div>
      <div className="mt-16 text-[#27272a]">
        <FormField 
          labelName="Search Posts" 
          type='text' 
          name='text'
          placeholder="What are you looking for..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#27272a] text-xl mb-3">
                Showing results for <span className="text-[#52525b]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchedResults} title="No search results were located"/>
              ) : (
                <RenderCards data={allPost} title="No posts found"/>
              )}
            </div>
          </>
        )}

      </div>

    </section>
  )
}

export default Home