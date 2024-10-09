import classnames from 'classnames';
import styles from './PipeList.module.scss';

interface PipeListProps<T> {
  className?: string;
  items: T[];
}

export default function PipeList<T>({ items, className }: PipeListProps<T>) {
  return (
    <ul className={classnames(styles.list, className)}>
      {items.map((item: T, idx) => (
        <li key={idx}>
          <>{item}</>
        </li>
      ))}
    </ul>
  );
}
