function ContactCard(props: {icon: any, contactInfo: String}) {
  return (
    <div className="flex gap-2 items-center">
      {props.icon}
      {props.contactInfo}
    </div>
  );
}

export default ContactCard;
