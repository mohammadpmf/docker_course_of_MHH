# اینجا برای این که داده های قبلیم از بین نرن رفتم رو دیتابیس ۲
# چون تو فایل اولی ۰ و ۱ رو تست کرده بودم.
import redis
r = redis.Redis(host="localhost", port=7777, db=2, decode_responses=True)
# # Store multiple fields in one key
# r.hset("user:1", mapping={
#     "name": "Mohammad",
#     "number": "123"
# })
user = r.hgetall("user:1")
print(user, type(user))
