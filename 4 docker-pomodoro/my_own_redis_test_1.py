# pip install redis
import redis
# Connect to Redis
r = redis.Redis(
    host="localhost",
    port=7777,
    db=0,
    decode_responses=True  # so we get strings instead of bytes
)
# # Set values
# r.set("name", "Mohammad")
# r.set("number", 123)
# Get values
name = r.get("name")
number = r.get("number")
print("Name:", name, type(name))
print("Number:", number, type(number))
# خودم ور رفتم باهاش دیدم کلا ردیس دیفالت ۱۶ تا دیتابیس داره. از ۰ تا ۱۵ اسمشون رو نمیشه عوض کرد.
# خیلی وقتا هم اصلا از بقیه استفاده نمیشه. کلیدها توشون جدا هستند ولی حافظه ۱۶ تا
# دیتابیسش اشتراکی هست. گفتم بنویسم که الکی وقتم رو نگیرم.
# نکته آخر این که اکثر ابزارهایی که با ردیس کار میکنن گفت فقط از همون دیتابیس شماره ۰
# پشتیبانی میکنن به خاطر همینه که زیاد از بقیه استفاده نمیشه.
# حتی میشه تعدادش رو هم عوض کرد. دیفالتش ۱۶ تاست ولی خیلی نادره.