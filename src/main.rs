use std::{fs, io};

fn main() -> io::Result<()> {
    println!("Reading the contents of dir/link");
    let buf = fs::read_to_string("./dir/link")?;
    println!("{}", buf);
    Ok(())
}
