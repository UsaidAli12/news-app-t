import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetNewsQuery, useGetAuthorsQuery } from './newsApi';
import { Skeleton } from '../../components/Skeletons';
import '../../styles/NewList.css';

export const NewList: React.FC = () => {
  const { t } = useTranslation();
  const { data: news, error: newsError, isLoading: newsLoading } = useGetNewsQuery();
  const { data: authors, error: authError, isLoading: authLoading } = useGetAuthorsQuery();

  if (newsLoading || authLoading) return <Skeleton />;
  if (newsError || authError) return <div className="error">{t('error')}</div>;

  const authorMap = Object.fromEntries(authors!.map((a) => [a.id, a]));

  return (
    <div className="news-container">
      <h2 className="news-heading">{t('news')}</h2>
      <div className="news-list">
        {news!.map((item) => {
          const author = authorMap[item.userId];
          return (
            <div className="news-card" key={item.id}>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-body">{item.body}</p>
              <p className="news-author">
                <em>{t('authorLabel')} {author?.name ?? t('unknown')}</em>
              </p>
              <button className="read-more-btn">{t('readMore')}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
