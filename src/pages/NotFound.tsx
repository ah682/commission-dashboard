import { Link } from 'react-router-dom';

export function NotFound()
{
    return(
        <div className="flex flex-col justify-center items-center min-h-[70vh] text-center px-4">
        <h1 className="text-8xl font-bold">404</h1>

        <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>

        <p className="text-lg text-base-content/70 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4">
            <Link to="/" className="btn btn-primary btn-lg">Go Home</Link>
        </div>
        </div>
    );
}

export default NotFound;