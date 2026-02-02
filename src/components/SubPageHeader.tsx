import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '@/assets/icon/portfolio-v2-logo.png';

export const SubPageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className='subpage-header'>
      <Link to='/' className='subpage-header__logo'>
        <img src={logo} alt='Daniel' />
      </Link>
      <button onClick={() => navigate(-1)} className='subpage-header__back'>
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>
    </header>
  );
};
