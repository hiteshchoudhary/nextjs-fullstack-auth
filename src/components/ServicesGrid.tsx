// components/ServiceGrid.js
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Service 1',
    description: 'Description for Service 1',
    image: '/service1.jpg',
  },
  // Add more service objects as needed
];

const ServiceGrid = () => {
  return (
    <div className="grid sm:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-8">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServiceGrid;
