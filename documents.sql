create or replace function match_trip_docs (
    query_embedding vector(1024),
    match_threshold float,
    match_count int
  )
  returns table (
    id bigint,
    content text,
    similarity float
  )
  language sql stable
  as $$
    select
      trip_docs.id,
      trip_docs.content,
      1 - (trip_docs.embedding <=> query_embedding) as similarity
    from trip_docs
    where 1 - (trip_docs.embedding <=> query_embedding) > match_threshold
    order by (trip_docs.embedding <=> query_embedding) asc
    limit match_count;
  $$;
