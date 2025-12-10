export default function Pegination({ page, onNext, onPrev }) {
    return (
      <div className="pagination">
        <button className='btn-page' onClick={onPrev} disabled={page === 1}>Prev</button>
        <p className='page-number'>{page}</p>
        <button className='btn-page' onClick={onNext}>Next</button>
      </div>
    );
  }