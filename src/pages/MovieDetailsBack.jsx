<div className="flex flex-col gap-8">
  <div className="flex text-md font-semibold border-b-2 border-[var(--maintab-border)]">
    <button
      onClick={() => setTab("overview")}
      className={
        tab == "overview"
          ? `border-b-2 flex-1 p-2 border-[var(--secondary)]`
          : `flex-1 p-2`
      }
    >
      Overview
    </button>
    <button
      onClick={() => setTab("cast")}
      className={
        tab == "cast"
          ? `border-b-2 flex-1 p-2 border-[var(--secondary)]`
          : `flex-1 p-2`
      }
    >
      Cast
    </button>
    <button
      onClick={() => setTab("reviews")}
      className={
        tab == "reviews"
          ? `border-b-2 flex-1 p-2 border-[var(--secondary)]`
          : `flex-1 p-2`
      }
    >
      Reviews
    </button>
  </div>
  {tab === "overview" && (
    <div className="p-4 bg-linear-to-r from-[#0A0A0A] rounded-xl border-2 border-[#282727]">
      <h1 className="text-xl font-bold text-[var(--secondary)]">
        Movie Details
      </h1>
      <span className="flex justify-between">
        <h1 className="">Release Date </h1>
        <h1 className="text-[var(--secondary)]">{movie.release_date}</h1>
      </span>
      <span className="flex justify-between">
        <h1 className="text-textgray">Status</h1>
        <h1 className="text-[var(--text-secondary)]">{movie.status}</h1>
      </span>
      <span className="flex justify-between">
        <h1 className="text-textgray">Runtime</h1>
        <h1 className="text-[var(--text-secondary)]">
          {formatRuntime(movie.runtime)}
        </h1>
      </span>
      <span className="flex justify-between">
        <h1 className="text-textgray">Budget</h1>
        <h1 className="text-[var(--text-secondary)]">
          {formatMillions(movie.budget)}
        </h1>
      </span>
      <span className="flex justify-between">
        <h1 className="text-textgray">Revenue</h1>
        <h1 className="text-[var(--text-secondary)]">
          {formatMillions(movie.revenue)}
        </h1>
      </span>
      <span className="flex justify-between">
        <h1 className="text-textgray">Language</h1>
        <h1 className="text-[var(--text-secondary)]">
          {movie.original_language}
        </h1>
      </span>
    </div>
  )}
  <div></div>
</div>;
