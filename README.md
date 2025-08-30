caprover login --caproverUrl http://caprover.lan:3000 -p '!Dpksamir2'


tar -cvf deploy.tar *
caprover deploy -t ./deploy.tar

caprover deploy --default