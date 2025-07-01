const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-6 text-center">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} IdeaGenie. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
